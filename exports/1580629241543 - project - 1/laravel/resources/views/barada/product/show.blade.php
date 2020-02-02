
@extends('layouts.barada')


@section('title', '')

@push('header')
    <!-- custom css link or others header tags -->
@endpush

@push('body')
    <div class="">
        <div class="">
            Product
        </div>
        <div class="">
            <a class='' href="{{ route('barada.product.index') }}">Back</a>
            <a class='' href="{{ route('barada.product.create') }}" >Add</a>
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
                    <td>{{$product->id}}</td>
                </tr>
                <tr>
                    <td>name</td>
                    <td>{{$product->name}}</td>
                </tr>
                <tr>
                    <td>description</td>
                    <td>{{$product->description}}</td>
                </tr>
                <tr>
                    <td>price</td>
                    <td>{{$product->price}}</td>
                </tr>
                <tr>
                    <td>devise</td>
                    <td>{{$product->devise}}</td>
                </tr>
                <tr>
                    <td>deleted_at</td>
                    <td>{{$product->deleted_at}}</td>
                </tr>
                <tr>
                    <td>created_at</td>
                    <td>{{$product->created_at}}</td>
                </tr>
                <tr>
                    <td>updated_at</td>
                    <td>{{$product->updated_at}}</td>
                </tr>
                
            </tbody>
        </table>
    </div>
@endpush

@push('script')
    <!-- custom scripts -->
@endpush
