<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;

class JWTMiddlware
{
    /**
     * Handle an incoming request.
     *
     * @param  Request  $request
     * @param  Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        }catch(\Exception $e) {
            if($e instanceof TokenExpiredException) {
                $newToken = JWTAuth::parseToken()->refresh();
                $user = JWTAuth::user();
                return response()->json(['success' => true, 'status' => 'refresh', 'token' => $newToken,'user' => $user],200);
            }else if($e instanceof  TokenInvalidException) {
                return response()->json(['success' => false, 'status' => 'Invalid Token'],401);
            }else {
                return response()->json(['success' => false, 'status' => 'Token not found'],401);
            }
        }
        return $next($request);
    }
}
