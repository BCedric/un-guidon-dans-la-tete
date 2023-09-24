<?php

namespace App\Controller\api;

use App\Entity\MobileWorkshop;
use App\Repository\MobileWorkshopRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;


#[Route("/mobile-workshop")]
class MobileWorkshopController extends AbstractController
{
    private $normalizer;

    public function __construct(NormalizerInterface $normalizer)
    {
        $this->normalizer = $normalizer;
    }


    #[Route("", name: "get_mobile_workshop", methods: ["GET"])]
    public function index(MobileWorkshopRepository $mobileWorkshopRepository)
    {
        return new JsonResponse($this->normalizer->normalize($mobileWorkshopRepository->findBy([], ['startDate' => 'DESC']), null, [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]));
    }

    #[Route("/coming", name: "get_coming_mobile_workshop", methods: ["GET"])]
    public function getComingWorkshops(MobileWorkshopRepository $mobileWorkshopRepository)
    {
        return new JsonResponse($this->normalizer->normalize($mobileWorkshopRepository->findComingWorkshops(), null, [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]));
    }


    #[Route("", name: "post_mobile_workshop", methods: ["POST"])]
    public function create(Request $request, EntityManagerInterface $em, MobileWorkshopRepository $mobileWorkshopRepository)
    {
        $body = json_decode($request->getContent(), true);
        $workshop = new MobileWorkshop();
        $workshop->setMobileWorkshop($body);
        $em->persist($workshop);
        $em->flush();
        return $this->index($mobileWorkshopRepository);
    }


    #[Route("/{id}", name: "put_mobile_workshop", methods: ["PUT"])]
    public function update(string $id, Request $request, EntityManagerInterface $em, MobileWorkshopRepository $mobileWorkshopRepository)
    {
        $body = json_decode($request->getContent(), true);
        $workshop = $mobileWorkshopRepository->findOneBy(['id' => $id]);
        $workshop->setMobileWorkshop($body);
        $em->flush();
        return $this->index($mobileWorkshopRepository);
    }


    #[Route("/{id}", name: "delete_mobile_workshop", methods: ["DELETE"])]
    public function delete(string $id, EntityManagerInterface $em, MobileWorkshopRepository $mobileWorkshopRepository)
    {
        $workshop = $mobileWorkshopRepository->findOneBy(['id' => $id]);
        $em->remove($workshop);
        $em->flush();
        return $this->index($mobileWorkshopRepository);
    }
}