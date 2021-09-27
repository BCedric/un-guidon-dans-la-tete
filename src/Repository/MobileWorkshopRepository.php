<?php

namespace App\Repository;

use App\Entity\MobileWorkshop;
use DateTime;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method MobileWorkshop|null find($id, $lockMode = null, $lockVersion = null)
 * @method MobileWorkshop|null findOneBy(array $criteria, array $orderBy = null)
 * @method MobileWorkshop[]    findAll()
 * @method MobileWorkshop[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MobileWorkshopRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MobileWorkshop::class);
    }

    public function findComingWorkshops()
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.endDate > :val')
            ->setParameter('val', new DateTime())
            ->orderBy('w.startDate', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;

    }

    // /**
    //  * @return MobileWorkshop[] Returns an array of MobileWorkshop objects
    //  */
    /*
    public function findByExampleField($value)
    {
    return $this->createQueryBuilder('m')
    ->andWhere('m.exampleField = :val')
    ->setParameter('val', $value)
    ->orderBy('m.id', 'ASC')
    ->setMaxResults(10)
    ->getQuery()
    ->getResult()
    ;
    }
     */

    /*
public function findOneBySomeField($value): ?MobileWorkshop
{
return $this->createQueryBuilder('m')
->andWhere('m.exampleField = :val')
->setParameter('val', $value)
->getQuery()
->getOneOrNullResult()
;
}
 */
}
