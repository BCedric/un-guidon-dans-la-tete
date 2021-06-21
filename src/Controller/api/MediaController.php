<?php

namespace App\Controller\api;

use App\Entity\Media;
use App\Repository\MediaRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
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
    private $directory = "medias";

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
     * @Route("/{filename}", name="get_media_by_filename", methods={"GET"})
     */
    public function getByFilename(string $filename, MediaRepository $mediaRepository)
    {
        $filePath = $this->directory . '/' . $filename;
        $response = new BinaryFileResponse($filePath);

        $response->headers->set('Content-Type', mime_content_type($filePath));
        return $response;
    }

    /**
     * @Route("/{id}", name="delete_media", methods={"DELETE"})
     */
    public function delete(string $id, MediaRepository $mediaRepository, EntityManagerInterface $em)
    {
        $media = $mediaRepository->findOneBy(['id' => $id]);
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
        $media->setFilename($uploadedFile->getClientOriginalName());
        $media->setType($uploadedFile->getMimeType());
        $uploadedFile->move($this->directory . '/', $uploadedFile->getClientOriginalName());

        $em->persist($media);
        $em->flush();

        return $this->index($mediaRepository);
    }
}
