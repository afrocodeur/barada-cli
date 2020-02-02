
@extends('layouts.barada')


@section('title', '')

@push('header')
    <!-- custom css link or others header tags -->
@endpush

@push('body')
    <div class="">
        <div class="">
            User
        </div>
        <div class="">
            <a class='' href="{{ route('barada.user.index') }}">Back</a>
            <a class='' href="{{ route('barada.user.create') }}" >Add</a>
        </div>
    </div>

    <div class=''>
        <table>
            <thead>
            <tr>
                <td>Key</td>
                <td>Value</td>
            </tr>
            </thead>
            <tbody>
                <tr>
                    <td>id</td>
                    <td>{{$user->id}}</td>
                </tr>
                <tr>
                    <td>firstname</td>
                    <td>{{$user->firstname}}</td>
                </tr>
                <tr>
                    <td>lastname</td>
                    <td>{{$user->lastname}}</td>
                </tr>
                <tr>
                    <td>email</td>
                    <td>{{$user->email}}</td>
                </tr>
                <tr>
                    <td>password</td>
                    <td>{{$user->password}}</td>
                </tr>
                <tr>
                    <td>email_verified_at</td>
                    <td>{{$user->email_verified_at}}</td>
                </tr>
                <tr>
                    <td>type</td>
                    <td>{{$user->type}}</td>
                </tr>
                <tr>
                    <td>deleted_at</td>
                    <td>{{$user->deleted_at}}</td>
                </tr>
                <tr>
                    <td>created_at</td>
                    <td>{{$user->created_at}}</td>
                </tr>
                <tr>
                    <td>updated_at</td>
                    <td>{{$user->updated_at}}</td>
                </tr>
                
            </tbody>
        </table>
    </div>
@endpush

@push('script')
    <!-- custom scripts -->
@endpush
