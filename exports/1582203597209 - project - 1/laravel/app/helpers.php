<?php


if(!function_exists('array_overlay')) {
    function array_overlay($a1, $a2)
    {
        foreach($a1 as $k => $v) {
            if(!array_key_exists($k,$a2)) continue;
            if(is_array($v) && is_array($a2[$k])){
                $a1[$k] = array_overlay($v,$a2[$k]);
            }else{
                $a1[$k] = $a2[$k];
            }
        }
        return $a1;
    }
}