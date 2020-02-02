
@extends('layouts.barada')


@section('title', '')

@push('header')
    <!-- custom css link or others header tags -->
@endpush

@push('body')
    <div class="">
        <div class="">
            User        </div>
        <div class="">
            <a class='' href="{{ route('barada.user.create') }}" >Add</a>
        </div>
    </div>

    <div class=''>
        <table>
            <thead>
                <tr>

                    <th>Id</th>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>Email_verified_at</th>
                    <th>Type</th>
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
                    <td>{{ $item->firstname }}</td>
                    <td>{{ $item->lastname }}</td>
                    <td>{{ $item->email }}</td>
                    <td>{{ $item->email_verified_at }}</td>
                    <td>{{ $item->type }}</td>
                    <td>{{ $item->deleted_at }}</td>
                    <td>{{ $item->created_at }}</td>
                    <td>{{ $item->updated_at }}</td>
                    
                    <td>
                        <a class = '' href="{{ route('barada.user.show', $item->id) }}">Show</a>
                        <a class = '' href="{{ route('barada.user.edit', $item->id) }}">Edit</a>
                        <form action="{{ route('barada.user.destroy', $item->id) }}" method="POST" >
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
