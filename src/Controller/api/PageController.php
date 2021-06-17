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
     * @Route("/tags", name="get_tags", methods={"GET"})
     */
    public function getTags(PageRepository $pageRepository)
    {
        $pages = $pageRepository->findAll();
        $tags = array_reduce($pages, function ($array, $page) {
            $array[] = $page->getTag();
            return $array;
        }, []);
        return new JsonResponse($tags);
    }

    /**
     * @Route("", name="get_pages", methods={"GET"})
     */
    public function index(PageRepository $pageRepository)
    {
        $pages = $pageRepository->findAll();
        return new JsonResponse($this->normalizer->normalize($pages, null, ['circular_reference_handler' => function ($object) {
            return $object->getId();
        }]));
    }

    /**
     * @Route("/{tag}", name="get_by_tag", methods={"GET"})
     */
    public function getPageByTag(string $tag, PageRepository $pageRepository)
    {
        $page = $pageRepository->findOneBy(['tag' => $tag]);
        return new JsonResponse($this->normalizer->normalize($page, null, ['circular_reference_handler' => function ($object) {
            return $object->getId();
        }]));
    }

}
