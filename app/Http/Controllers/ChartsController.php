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
        $social = Social::first();
        return Inertia::render('Charts/Index', ['social' => $social]);
    }

    public function save()
    {
        $socialCount = Social::count();
        if ($socialCount === 0) {
            Social::create(Request::only('facebook', 'google', 'instagram', 'linkedin', 'twitter'));
        } else {
            $social = Social::first();
            $social->update(Request::only('facebook', 'google', 'instagram', 'linkedin', 'twitter'));
        }

        return Redirect::route('charts');
    }
}
