<?php

namespace App\Controller\api;

use App\Repository\InfoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

/**
 * @Route("/info")
 */
class InfoController extends AbstractController
{
    private $normalizer;

    public function __construct(NormalizerInterface $normalizer)
    {
        $this->normalizer = $normalizer;
    }

    /**
     * @Route("", name="get_infos", methods={"GET"})
     */
    public function index(InfoRepository $infoRepository)
    {
        return new JsonResponse($this->normalizer->normalize($infoRepository->findAll(), null, ['circular_reference_handler' => function ($object) {
            return $object->getId();
        }]));
    }

    /**
     * @Route("/{id}", name="put_info", methods={"PUT"})
     */
    public function update(string $id, Request $request, EntityManagerInterface $em, InfoRepository $infoRepository)
    {
        $info = $infoRepository->findOneBy(['id' => $id]);
        $body = json_decode($request->getContent(), true);
        $info->setValue($body['value']);
        $em->persist($info);
        $em->flush();
        return new JsonResponse($this->normalizer->normalize($infoRepository->findAll(), null, ['circular_reference_handler' => function ($object) {
            return $object->getId();
        }]));
    }

}
