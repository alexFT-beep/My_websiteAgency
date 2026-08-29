<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    /**
     * Store a lead submission from the contact form.
     */
    public function store(Request $request): JsonResponse|RedirectResponse
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:150',
            'email' => 'required|email|max:150',
            'telefono' => 'nullable|string|max:40',
            'empresa' => 'nullable|string|max:150',
            'servicio_interes' => 'nullable|string|max:100',
            'mensaje' => 'nullable|string|max:3000',
            'presupuesto' => 'nullable|string|max:100',
        ]);

        if ($validator->fails()) {
            if ($request->expectsJson() || $request->ajax()) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors(),
                ], 422);
            }

            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $leadData = $validator->validated();
        $leadData['ip_address'] = $request->ip();

        $lead = Lead::create($leadData);

        if ($request->expectsJson() || $request->ajax()) {
            return response()->json([
                'success' => true,
                'message' => '¡Gracias por contactarnos! Tu solicitud ha sido recibida y nuestro equipo te responderá en breve.',
                'lead_id' => $lead->id,
            ]);
        }

        return redirect()->route('formulario')
            ->with('success', '¡Gracias por comunicarte! Nuestro equipo revisará tu solicitud de inmediato.');
    }
}
