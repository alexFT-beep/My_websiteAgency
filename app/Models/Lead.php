<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'email',
        'telefono',
        'empresa',
        'servicio_interes',
        'mensaje',
        'presupuesto',
        'ip_address',
    ];
}
