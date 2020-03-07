
@extends('layouts.barada')


@section('title', '')

@push('header')
    <!-- custom css link or others header tags -->
@endpush

@push('body')
    <div class="">
        <div class="">
            Role
        </div>
        <div class="">
            <a class='' href="{{ route('barada.role.index') }}">Back</a>
            <a class='' href="{{ route('barada.role.create') }}" >Add</a>
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
                    <td>{{$role->id}}</td>
                </tr>
                <tr>
                    <td>title</td>
                    <td>{{$role->title}}</td>
                </tr>
                <tr>
                    <td>description</td>
                    <td>{{$role->description}}</td>
                </tr>
                <tr>
                    <td>deleted_at</td>
                    <td>{{$role->deleted_at}}</td>
                </tr>
                <tr>
                    <td>created_at</td>
                    <td>{{$role->created_at}}</td>
                </tr>
                <tr>
                    <td>updated_at</td>
                    <td>{{$role->updated_at}}</td>
                </tr>
                
            </tbody>
        </table>
    </div>
@endpush

@push('script')
    <!-- custom scripts -->
@endpush
