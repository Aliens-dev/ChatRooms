<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta content="{{ csrf_token() }}" name="csrf-token">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Chat App</title>
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
        <link rel="stylesheet" href="{{ asset('/css/app.css') }}" >
    </head>
    <body>
        <div id="app"></div>
        <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
