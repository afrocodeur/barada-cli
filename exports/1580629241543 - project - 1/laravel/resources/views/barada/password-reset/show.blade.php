
@extends('layouts.barada')


@section('title', '')

@push('header')
    <!-- custom css link or others header tags -->
@endpush

@push('body')
    <div class="">
        <div class="">
            PasswordReset
        </div>
        <div class="">
            <a class='' href="{{ route('barada.password-reset.index') }}">Back</a>
            <a class='' href="{{ route('barada.password-reset.create') }}" >Add</a>
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
                    <td>{{$passwordReset->id}}</td>
                </tr>
                <tr>
                    <td>email</td>
                    <td>{{$passwordReset->email}}</td>
                </tr>
                <tr>
                    <td>token</td>
                    <td>{{$passwordReset->token}}</td>
                </tr>
                <tr>
                    <td>deleted_at</td>
                    <td>{{$passwordReset->deleted_at}}</td>
                </tr>
                <tr>
                    <td>created_at</td>
                    <td>{{$passwordReset->created_at}}</td>
                </tr>
                <tr>
                    <td>updated_at</td>
                    <td>{{$passwordReset->updated_at}}</td>
                </tr>
                
            </tbody>
        </table>
    </div>
@endpush

@push('script')
    <!-- custom scripts -->
@endpush
