<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  mixed ...$roles
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = $request->user();

        if (!$user) {
            abort(401, 'Authentication required.');
        }

        if (empty($roles)) {
            abort(500, 'No roles specified for middleware.');
        }

        // Support for multiple roles, and allow for array or pipe-separated roles
        $roles = collect($roles)
            ->flatMap(fn ($role) => explode('|', $role))
            ->map(fn ($role) => strtolower(trim($role)))
            ->unique()
            ->toArray();

        // Use the hasRole method on the user model
        $hasRole = $user->hasRole($roles);
        if (!$hasRole) {
            abort(403, 'Unauthorized.');
        }

        return $next($request);
    }
}