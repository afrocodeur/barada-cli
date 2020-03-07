
@extends('layouts.barada')


@section('title', '')

@push('header')
    <!-- custom css link or others header tags -->
@endpush

@push('body')
    <div class="">
        <div class="">
           @isset($table7) Edit @else Create @endif Table7        </div>
        <div class="">
            <a class='' href="{{ route('barada.table7.index') }}" >Back</a>
            <a class='' href="{{ route('barada.table7.create') }}" >Add</a>
        </div>
    </div>

    <div class=''>

        <form action="{{ isset($table7)? route('barada.table7.update', $table7->id) : route('barada.table7.store') }}" method="POST" >
            @isset($table7)
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
                <span>Command</span>
                <select name="command_id" >
                    @isset($table7)
                        @foreach($command as $item)
                            <option value="{{ $item->id }}" @if($table7->command_id === $item->id) selected @endif >{{ $item->toString() }}</option>
                        @endforeach
                    @else
                        @foreach($command as $item)
                            <option value="{{ $item->id }}" >{{ $item->toString() }}</option>
                        @endforeach
                    @endisset
                </select>
            </label>
        </div>
            
        <div class="">
            <label >
                <span>Product</span>
                <select name="product_id" >
                    @isset($table7)
                        @foreach($product as $item)
                            <option value="{{ $item->id }}" @if($table7->product_id === $item->id) selected @endif >{{ $item->toString() }}</option>
                        @endforeach
                    @else
                        @foreach($product as $item)
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


