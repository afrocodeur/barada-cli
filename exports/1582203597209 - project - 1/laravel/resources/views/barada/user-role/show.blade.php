
@extends('layouts.barada')


@section('title', '')

@push('header')
    <!-- custom css link or others header tags -->
@endpush

@push('body')
    <div class="">
        <div class="">
            UserRole
        </div>
        <div class="">
            <a class='' href="{{ route('barada.user-role.index') }}">Back</a>
            <a class='' href="{{ route('barada.user-role.create') }}" >Add</a>
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
                    <td>{{$userRole->id}}</td>
                </tr>
                <tr>
                    <td>user</td>
                    <td>{{$userRole->user->toString()}}</td>
                </tr>
                <tr>
                    <td>role</td>
                    <td>{{$userRole->role->toString()}}</td>
                </tr>
                <tr>
                    <td>deleted_at</td>
                    <td>{{$userRole->deleted_at}}</td>
                </tr>
                <tr>
                    <td>created_at</td>
                    <td>{{$userRole->created_at}}</td>
                </tr>
                <tr>
                    <td>updated_at</td>
                    <td>{{$userRole->updated_at}}</td>
                </tr>
                
            </tbody>
        </table>
    </div>
@endpush

@push('script')
    <!-- custom scripts -->
@endpush
