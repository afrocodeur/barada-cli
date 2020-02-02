
@extends('layouts.barada')


@section('title', '')

@push('header')
    <!-- custom css link or others header tags -->
@endpush

@push('body')
    <div class="">
        <div class="">
           @isset($userRole) Edit @else Create @endif UserRole        </div>
        <div class="">
            <a class='' href="{{ route('barada.user-role.index') }}" >Back</a>
            <a class='' href="{{ route('barada.user-role.create') }}" >Add</a>
        </div>
    </div>

    <div class=''>

        <form action="{{ isset($userRole)? route('barada.user-role.update', $userRole->id) : route('barada.user-role.store') }}" method="POST" >
            @isset($userRole)
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
            
        <div class="">
            <label >
                <span>User</span>
                <select name="user_id" >
                    @isset($userRole)
                        @foreach($user as $item)
                            <option value="{{ $item->id }}" @if($userRole->user_id === $item->id) selected @endif >{{ $item->toString() }}</option>
                        @endforeach
                    @else
                        @foreach($user as $item)
                            <option value="{{ $item->id }}" >{{ $item->toString() }}</option>
                        @endforeach
                    @endisset
                </select>
            </label>
        </div>
            
        <div class="">
            <label >
                <span>Role</span>
                <select name="role_id" >
                    @isset($userRole)
                        @foreach($role as $item)
                            <option value="{{ $item->id }}" @if($userRole->role_id === $item->id) selected @endif >{{ $item->toString() }}</option>
                        @endforeach
                    @else
                        @foreach($role as $item)
                            <option value="{{ $item->id }}" >{{ $item->toString() }}</option>
                        @endforeach
                    @endisset
                </select>
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


