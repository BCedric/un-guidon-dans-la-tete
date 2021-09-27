<?php

namespace App\Entity;

use App\Repository\PageRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=PageRepository::class)
 */
class Page
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $tag;

    /**
     * @ORM\Column(type="text")
     */
    private $content;

    /**
     * @ORM\ManyToOne(targetEntity=Media::class)
     * @ORM\JoinColumn(name="media_id", referencedColumnName="id", onDelete="SET NULL")
     */
    private $headingImg;

    /**
     * @ORM\Column(type="integer", nullable=false, options={"default" : 50})
     */
    private $headingImgPosition;

    public function setPage(array $props)
    {
        $this->setContent($props['content']);
        $this->setTag($props['tag']);
        $this->setHeadingImg($props['headingImg']);
        $this->setHeadingImgPosition($props['headingImgPosition']);
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTag(): ?string
    {
        return $this->tag;
    }

    public function setTag(string $tag): self
    {
        $this->tag = $tag;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getHeadingImg(): ?Media
    {
        return $this->headingImg;
    }

    public function setHeadingImg(?Media $headingImg): self
    {
        $this->headingImg = $headingImg;

        return $this;
    }

    public function getHeadingImgPosition(): ?int
    {
        return $this->headingImgPosition;
    }

    public function setHeadingImgPosition(?int $headingImgPosition): self
    {
        $this->headingImgPosition = $headingImgPosition;

        return $this;
    }
}
