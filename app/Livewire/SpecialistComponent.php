<?php

namespace App\Livewire;

use Livewire\Component;

class SpecialistComponent extends Component
{
    public $count = 0;

    public function increment()
    {
        $this->count++;
    }
    
    public function render()
    {
        return view('livewire.specialist-component');
    }
}
