
@extends('layouts.barada')


@section('title', '')

@push('header')
    <!-- custom css link or others header tags -->
@endpush

@push('body')
    <div class="">
        <div class="">
           @isset($role) Edit @else Create @endif Role        </div>
        <div class="">
            <a class='' href="{{ route('barada.role.index') }}" >Back</a>
            <a class='' href="{{ route('barada.role.create') }}" >Add</a>
        </div>
    </div>

    <div class=''>

        <form action="{{ isset($role)? route('barada.role.update', $role->id) : route('barada.role.store') }}" method="POST" >
            @isset($role)
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
                <span>Title</span>
                <input type="text" name="title" value="{{ old('title',  $role->title ?? null) }}" />
            </label>
        </div>
            
        <div class="form-input">
            <label >
                <span>Description</span>
                <input type="text" name="description" value="{{ old('description',  $role->description ?? null) }}" />
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


