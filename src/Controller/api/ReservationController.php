<?php

namespace App\Controller\api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/reservation")
 */
class ReservationController extends AbstractController
{

    /**
     * @Route("", name="get_reservation", methods={"GET"})
     */
    public function index()
    {
        return new JsonResponse(['coucou' => "blablabla"]);
    }
}
