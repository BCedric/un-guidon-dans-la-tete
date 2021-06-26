<?php

namespace App\Controller\api;

use App\Entity\MenuItem;
use App\Repository\MenuItemRepository;
use App\Repository\PageRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

/**
 * @Route("/menu")
 */
class MenuItemController extends AbstractController
{

    private $normalizer;

    public function __construct(NormalizerInterface $normalizer)
    {
        $this->normalizer = $normalizer;
    }

    /**
     * @Route("", name="get_menu_items", methods={"GET"})
     */
    public function index(MenuItemRepository $menuItemRepository)
    {
        return new JsonResponse($this->normalizer->normalize($menuItemRepository->findBy([], ['position' => 'ASC']), null, ['circular_reference_handler' => function ($object) {
            return $object->getId();
        }]));
    }

    /**
     * @Route("", name="post_menu_item", methods={"POST"})
     */
    public function createPage(Request $request, EntityManagerInterface $em, MenuItemRepository $menuItemRepository, PageRepository $pageRepository)
    {
        $body = json_decode($request->getContent(), true);
        $menuItem = new MenuItem();
        $this->setMenuItem($body, $menuItem, $menuItemRepository, $pageRepository, $em);

        $em->persist($menuItem);
        $em->flush();
        return $this->index($menuItemRepository);
    }

    /**
     * @Route("/{id}", name="delete_menu_item", methods={"DELETE"})
     */
    public function deletePage(string $id, EntityManagerInterface $em, MenuItemRepository $menuItemRepository)
    {
        $menuItem = $menuItemRepository->findOneBy(['id' => $id]);
        $em->remove($menuItem);
        $em->flush();
        return $this->index($menuItemRepository);
    }

    /**
     * @Route("/{id}", name="put_menu_item", methods={"PUT"})
     */
    public function updatePage(string $id, Request $request, EntityManagerInterface $em, MenuItemRepository $menuItemRepository, PageRepository $pageRepository)
    {
        $menuItem = $menuItemRepository->findOneBy(['id' => $id]);

        $body = json_decode($request->getContent(), true);

        $this->setMenuItem($body, $menuItem, $menuItemRepository, $pageRepository, $em);

        $em->flush();
        return $this->index($menuItemRepository);
    }

    public function setMenuItem(array $props, MenuItem $menuItem, MenuItemRepository $menuItemRepository, PageRepository $pageRepository, EntityManagerInterface $em)
    {
        $page = $props['page'] != null ? $pageRepository->findOneBy(['id' => $props['page']]) : null;
        $menuItem->removeChildren();
        $menuItem->setPosition($props['position']);
        $menuItem->setPage($page);
        $menuItem->setName($props['name']);

        foreach ($props['children'] as $childId) {
            $child = $menuItemRepository->findOneBy(['id' => $childId]);
            $menuItem->addChild($child);
        }
    }
}
