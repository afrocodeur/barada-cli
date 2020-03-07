
@extends('layouts.barada')


@section('title', '')

@push('header')
    <!-- custom css link or others header tags -->
@endpush

@push('body')
    <div class="">
        <div class="">
           @isset($passwordReset) Edit @else Create @endif PasswordReset        </div>
        <div class="">
            <a class='' href="{{ route('barada.password-reset.index') }}" >Back</a>
            <a class='' href="{{ route('barada.password-reset.create') }}" >Add</a>
        </div>
    </div>

    <div class=''>

        <form action="{{ isset($passwordReset)? route('barada.password-reset.update', $passwordReset->id) : route('barada.password-reset.store') }}" method="POST" >
            @isset($passwordReset)
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
                <span>Email</span>
                <input type="text" name="email" value="{{ old('email',  $passwordReset->email ?? null) }}" />
            </label>
        </div>
            
        <div class="form-input">
            <label >
                <span>Token</span>
                <input type="text" name="token" value="{{ old('token',  $passwordReset->token ?? null) }}" />
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


