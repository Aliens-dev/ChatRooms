<?php


namespace App\Traits;


trait ApiResponser
{
    protected function ErrorResponse($code = 401,$message = 'Error!') {
        return response()->json(['success' => false, 'message' => $message] , $code);
    }
    protected function SuccessResponse($code = 200,$message = 'Success!') {
        return response()->json(['success' => true, 'message' => $message] , $code);
    }
}
