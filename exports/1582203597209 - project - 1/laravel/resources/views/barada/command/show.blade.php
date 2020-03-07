
@extends('layouts.barada')


@section('title', '')

@push('header')
    <!-- custom css link or others header tags -->
@endpush

@push('body')
    <div class="">
        <div class="">
            Command
        </div>
        <div class="">
            <a class='' href="{{ route('barada.command.index') }}">Back</a>
            <a class='' href="{{ route('barada.command.create') }}" >Add</a>
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
                    <td>{{$command->id}}</td>
                </tr>
                <tr>
                    <td>name</td>
                    <td>{{$command->name}}</td>
                </tr>
                <tr>
                    <td>description</td>
                    <td>{{$command->description}}</td>
                </tr>
                <tr>
                    <td>user</td>
                    <td>{{$command->user->toString()}}</td>
                </tr>
                <tr>
                    <td>deleted_at</td>
                    <td>{{$command->deleted_at}}</td>
                </tr>
                <tr>
                    <td>created_at</td>
                    <td>{{$command->created_at}}</td>
                </tr>
                <tr>
                    <td>updated_at</td>
                    <td>{{$command->updated_at}}</td>
                </tr>
                
            </tbody>
        </table>
    </div>
@endpush

@push('script')
    <!-- custom scripts -->
@endpush
