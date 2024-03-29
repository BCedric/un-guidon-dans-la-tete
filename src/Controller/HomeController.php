<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{


    #[Route("/", name: "home")]

    public function index(Request $request): Response
    {
        $baseURL = $request->getScheme() . '://' . $request->getHttpHost() . $request->getBasePath();

        return $this->render('default/index.html.twig', ['baseURL' => $baseURL]);

    }
}