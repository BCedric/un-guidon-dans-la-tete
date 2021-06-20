<?php

namespace App\Controller\api;

use App\Entity\Media;
use App\Repository\MediaRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

/**
 * @Route("/media")
 */
class MediaController extends AbstractController
{
    private $normalizer;
    private $directory = "media";

    public function __construct(NormalizerInterface $normalizer)
    {
        $this->normalizer = $normalizer;
    }

    /**
     * @Route("", name="get_medias", methods={"GET"})
     */
    public function index(MediaRepository $mediaRepository)
    {
        return new JsonResponse($this->normalizer->normalize($mediaRepository->findAll(), null, ['circular_reference_handler' => function ($object) {
            return $object->getId();
        }]));

    }

    /**
     * @Route("/{id}", name="delete_media", methods={"DELETE"})
     */
    public function delete(Media $media, MediaRepository $mediaRepository, EntityManagerInterface $em)
    {
        $filesystem = new Filesystem();
        $filesystem->remove($this->directory . '/' . $media->getFilename());

        $em->remove($media);
        $em->flush();

        return $this->index($mediaRepository);
    }

    /**
     * @Route("", name="post_media", methods={"POST"})
     */
    public function post(Request $request, MediaRepository $mediaRepository, EntityManagerInterface $em)
    {
        $media = new Media();
        $uploadedFile = $request->files->get('file');
        $uploadedFile->move($this->directory . '/', $uploadedFile->getClientOriginalName());
        $media->setFilename($uploadedFile->getClientOriginalName());

        $em->persist($media);
        $em->flush();

        return $this->index($mediaRepository);
    }
}
