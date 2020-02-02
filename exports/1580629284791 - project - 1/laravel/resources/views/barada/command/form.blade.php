
@extends('layouts.barada')


@section('title', '')

@push('header')
    <!-- custom css link or others header tags -->
@endpush

@push('body')
    <div class="">
        <div class="">
           @isset($command) Edit @else Create @endif Command        </div>
        <div class="">
            <a class='' href="{{ route('barada.command.index') }}" >Back</a>
            <a class='' href="{{ route('barada.command.create') }}" >Add</a>
        </div>
    </div>

    <div class=''>

        <form action="{{ isset($command)? route('barada.command.update', $command->id) : route('barada.command.store') }}" method="POST" >
            @isset($command)
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
                <input type="text" name="name" value="{{ old('name',  $command->name ?? null) }}" />
            </label>
        </div>
            
        <div class="form-input">
            <label >
                <span>Description</span>
                <input type="text" name="description" value="{{ old('description',  $command->description ?? null) }}" />
            </label>
        </div>
            
        <div class="">
            <label >
                <span>User</span>
                <select name="user_id" >
                    @isset($command)
                        @foreach($user as $item)
                            <option value="{{ $item->id }}" @if($command->user_id === $item->id) selected @endif >{{ $item->toString() }}</option>
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
                <button class="" type="reset">Reset</button>
                <button class="" type="submit">Save</button>
            </div>
        </form>

    </div>
@endpush

@push('script')
    <!-- custom scripts -->
@endpush


