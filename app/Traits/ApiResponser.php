<?php


namespace App\Traits;


use Illuminate\Http\JsonResponse;

trait ApiResponser
{
    protected function ErrorResponse($code = 401) {
        return response()->json(['success' => false] , $code);
    }
    protected function SuccessResponse($code = 200) {
        return response()->json(['success' => true] , $code);
    }

    protected function showAll($data,bool $success = true,int $code = 200) : JsonResponse {
        return response()->json(['success' => $success, 'data' => $data], $code);
    }
    protected function showOne($data,bool $success = true,int $code = 200) : JsonResponse {
        return response()->json(['success' => $success, 'data' => $data], $code);
    }
}
