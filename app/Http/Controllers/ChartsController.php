<?php
namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Social;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;

class ChartsController extends Controller
{
    public function index()
    {
        $name = Request::old('name', '');
        $value = Request::old('value', '');

        $socials = Social::all();
        return Inertia::render('Charts/Index', ['socials' => $socials, 'inputs' => ['name' => $name, 'value' => $value]]);
    }

    public function save()
    {
        $data = Request::all();

        foreach ($data as $name => $value) {;
            Social::where('name', $name)->update(['value' => $value]);
        }

        return Redirect::route('charts');
    }

    public function createSource()
    {
        Request::validate([
            'name' => ['required', 'max:50'],
            'value' => ['required', 'numeric'],
        ]);

        Social::create(
            Request::only('name', 'value')
        );

        return Redirect::route('charts');
    }

    public function deleteSource($id) {

        Social::find($id)->delete();

        return Redirect::route('charts');
    }
}
