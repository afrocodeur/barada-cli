
@extends('layouts.barada')


@section('title', '')

@push('header')
    <!-- custom css link or others header tags -->
@endpush

@push('body')
    <div class="">
        <div class="">
            Table7
        </div>
        <div class="">
            <a class='' href="{{ route('barada.table7.index') }}">Back</a>
            <a class='' href="{{ route('barada.table7.create') }}" >Add</a>
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
                    <td>{{$table7->id}}</td>
                </tr>
                <tr>
                    <td>command</td>
                    <td>{{$table7->command->toString()}}</td>
                </tr>
                <tr>
                    <td>product</td>
                    <td>{{$table7->product->toString()}}</td>
                </tr>
                <tr>
                    <td>deleted_at</td>
                    <td>{{$table7->deleted_at}}</td>
                </tr>
                <tr>
                    <td>created_at</td>
                    <td>{{$table7->created_at}}</td>
                </tr>
                <tr>
                    <td>updated_at</td>
                    <td>{{$table7->updated_at}}</td>
                </tr>
                
            </tbody>
        </table>
    </div>
@endpush

@push('script')
    <!-- custom scripts -->
@endpush
