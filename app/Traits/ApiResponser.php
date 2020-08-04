<?php


namespace App\Traits;


trait ApiResponser
{
    protected function ErrorResponse($code = 401) {
        return response()->json(['success' => false] , $code);
    }
    protected function SuccessResponse($code = 200) {
        return response()->json(['success' => true] , $code);
    }

    protected function showAll($data,$success = true,$code = 200) {
        return response()->json(['success' => $success, 'data' => $data], $code);
    }
}
