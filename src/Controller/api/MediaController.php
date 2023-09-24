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
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;


#[Route("/media")]
class MediaController extends AbstractController
{
    private $normalizer;
    private $directory = "medias";

    public function __construct(NormalizerInterface $normalizer)
    {
        $this->normalizer = $normalizer;
    }


    #[Route("", name: "get_medias", methods: ["GET"])]
    public function index(MediaRepository $mediaRepository)
    {
        return new JsonResponse($this->normalizer->normalize($mediaRepository->findBy([], ['filename' => 'ASC']), null, [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]));
    }


    #[Route("/{filename}", name: "get_media_by_filename", methods: ["GET"])]
    public function getByFilename(string $filename, MediaRepository $mediaRepository)
    {
        $filePath = $this->directory . '/' . $filename;
        $response = new BinaryFileResponse($filePath);

        $response->headers->set('Content-Type', mime_content_type($filePath));
        return $response;
    }


    #[Route("/{id}", name: "delete_media", methods: ["DELETE"])]
    public function delete(string $id, MediaRepository $mediaRepository, EntityManagerInterface $em)
    {
        $media = $mediaRepository->findOneBy(['id' => $id]);
        $filesystem = new Filesystem();
        $filesystem->remove($this->directory . '/' . $media->getFilename());

        $em->remove($media);
        $em->flush();

        return $this->index($mediaRepository);
    }


    #[Route("", name: "post_media", methods: ["POST"])]
    public function post(Request $request, MediaRepository $mediaRepository, EntityManagerInterface $em)
    {
        $media = new Media();
        $uploadedFile = $request->files->get('file');

        $filename = $uploadedFile->getClientOriginalName();

        if ($mediaRepository->findOneBy(['filename' => $filename])) {
            return new Response('Un média avec ce nom existe déjà', 500);
        }

        $media->setFilename($filename);
        $media->setType($uploadedFile->getMimeType());
        $uploadedFile->move($this->directory . '/', $filename);

        $em->persist($media);
        $em->flush();

        return $this->index($mediaRepository);
    }


    #[Route("/{id}", name: "put_media", methods: ["PUT"])]
    public function put(string $id, Request $request, MediaRepository $mediaRepository, EntityManagerInterface $em)
    {
        $body = json_decode($request->getContent(), true);
        $filename = $body['filename'];

        if ($mediaRepository->findOneBy(['filename' => $filename])) {
            return new Response('Un média avec ce nom existe déjà', 500);
        }

        $media = $mediaRepository->findOneBy(['id' => $id]);
        rename($this->directory . '/' . $media->getFilename(), $this->directory . '/' . $filename);
        $media->setFilename($filename);
        $em->flush();

        return $this->index($mediaRepository);

    }
}