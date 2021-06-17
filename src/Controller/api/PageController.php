<?php

namespace App\Controller\api;

use App\Repository\PageRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

/**
 * @Route("/page")
 */
class PageController extends AbstractController
{
    private $normalizer;

    public function __construct(NormalizerInterface $normalizer)
    {
        $this->normalizer = $normalizer;
    }

    /**
     * @Route("/{tag}", name="get_by_tag", methods={"GET"})
     */
    public function index(string $tag, PageRepository $pageRepository)
    {
        $page = $pageRepository->findOneBy(['tag' => $tag]);
        return new JsonResponse($this->normalizer->normalize($page, null, ['circular_reference_handler' => function ($object) {
            return $object->getId();
        }]));
    }
}
