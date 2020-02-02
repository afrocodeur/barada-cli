
@extends('layouts.barada')


@section('title', '')

@push('header')
    <!-- custom css link or others header tags -->
@endpush

@push('body')
    <div class="">
        <div class="">
           @isset($user) Edit @else Create @endif User        </div>
        <div class="">
            <a class='' href="{{ route('barada.user.index') }}" >Back</a>
            <a class='' href="{{ route('barada.user.create') }}" >Add</a>
        </div>
    </div>

    <div class=''>

        <form action="{{ isset($user)? route('barada.user.update', $user->id) : route('barada.user.store') }}" method="POST" >
            @isset($user)
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
                <span>Firstname</span>
                <input type="text" name="firstname" value="{{ old('firstname',  $user->firstname ?? null) }}" />
            </label>
        </div>
            
        <div class="form-input">
            <label >
                <span>Lastname</span>
                <input type="text" name="lastname" value="{{ old('lastname',  $user->lastname ?? null) }}" />
            </label>
        </div>
            
        <div class="form-input">
            <label >
                <span>Email</span>
                <input type="text" name="email" value="{{ old('email',  $user->email ?? null) }}" />
            </label>
        </div>
            
        <div class="form-input">
            <label >
                <span>Password</span>
                <input type="password" name="password" value="{{ old('password',  $user->password ?? null) }}" />
            </label>
        </div>
            
        <div class="form-input">
            <label >
                <span>Email_verified_at</span>
                <input type="text" name="email_verified_at" value="{{ old('email_verified_at',  $user->email_verified_at ?? null) }}" />
            </label>
        </div>
            
        <div class="form-input">
            <label >
                <span>Type</span>
                <input type="text" name="type" value="{{ old('type',  $user->type ?? null) }}" />
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


