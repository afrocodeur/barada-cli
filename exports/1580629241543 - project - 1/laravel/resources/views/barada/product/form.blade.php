
@extends('layouts.barada')


@section('title', '')

@push('header')
    <!-- custom css link or others header tags -->
@endpush

@push('body')
    <div class="">
        <div class="">
           @isset($product) Edit @else Create @endif Product        </div>
        <div class="">
            <a class='' href="{{ route('barada.product.index') }}" >Back</a>
            <a class='' href="{{ route('barada.product.create') }}" >Add</a>
        </div>
    </div>

    <div class=''>

        <form action="{{ isset($product)? route('barada.product.update', $product->id) : route('barada.product.store') }}" method="POST" >
            @isset($product)
                @method('PUT')
            @endisset

            @if ($errors->any())
                <div class="alert alert-danger">
                    <ul>
                        @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            @csrf
            
        <div class="form-input">
            <label >
                <span>Name</span>
                <input type="text" name="name" value="{{ old('name',  $product->name ?? null) }}" />
            </label>
        </div>
            
        <div class="form-input">
            <label >
                <span>Description</span>
                <input type="text" name="description" value="{{ old('description',  $product->description ?? null) }}" />
            </label>
        </div>
            
        <div class="form-input">
            <label >
                <span>Price</span>
                <input type="text" name="price" value="{{ old('price',  $product->price ?? null) }}" />
            </label>
        </div>
            
        <div class="form-input">
            <label >
                <span>Devise</span>
                <input type="text" name="devise" value="{{ old('devise',  $product->devise ?? null) }}" />
            </label>
        </div>
            
            <div class="">
                <button class="" type="reset">Reset</button>
                <button class="" type="submit">Save</button>
            </div>
        </form>

    </div>
@endpush

@push('script')
    <!-- custom scripts -->
@endpush


