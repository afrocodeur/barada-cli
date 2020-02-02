
@extends('layouts.barada')


@section('title', '')

@push('header')
    <!-- custom css link or others header tags -->
@endpush

@push('body')
    <div class="">
        <div class="">
            Product        </div>
        <div class="">
            <a class='' href="{{ route('barada.product.create') }}" >Add</a>
        </div>
    </div>

    <div class=''>
        <table>
            <thead>
                <tr>

                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Devise</th>
                    <th>Deleted_at</th>
                    <th>Created_at</th>
                    <th>Updated_at</th>
                    
                    <th>Options</th>

                </tr>
            </thead>
            <tbody>
            @foreach($items as $item)
                <tr>

                    <td>{{ $item->id }}</td>
                    <td>{{ $item->name }}</td>
                    <td>{{ $item->description }}</td>
                    <td>{{ $item->price }}</td>
                    <td>{{ $item->devise }}</td>
                    <td>{{ $item->deleted_at }}</td>
                    <td>{{ $item->created_at }}</td>
                    <td>{{ $item->updated_at }}</td>
                    
                    <td>
                        <a class = '' href="{{ route('barada.product.show', $item->id) }}">Show</a>
                        <a class = '' href="{{ route('barada.product.edit', $item->id) }}">Edit</a>
                        <form action="{{ route('barada.product.destroy', $item->id) }}" method="POST" >
                            @method('DELETE')
                            @csrf
                            <button class='' type="submit">Remove</button>
                        </form>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
@endpush

@push('script')
    <!-- custom scripts -->
@endpush
