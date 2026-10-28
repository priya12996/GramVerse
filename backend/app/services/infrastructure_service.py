from sqlalchemy.orm import Session

from app.models.infrastructure import Infrastructure


def create_infrastructure(data, db: Session):
    infrastructure = Infrastructure(**data.dict())

    db.add(infrastructure)
    db.commit()
    db.refresh(infrastructure)

    return infrastructure


def get_infrastructures(db: Session):
    return db.query(Infrastructure).all()


def get_infrastructure(infrastructure_id: int, db: Session):
    return (
        db.query(Infrastructure)
        .filter(Infrastructure.id == infrastructure_id)
        .first()
    )


def get_village_infrastructures(village_id: int, db: Session):
    return (
        db.query(Infrastructure)
        .filter(Infrastructure.village_id == village_id)
        .all()
    )


def update_infrastructure(
    infrastructure_id: int,
    data,
    db: Session
):
    infrastructure = get_infrastructure(
        infrastructure_id,
        db
    )

    if infrastructure:

        infrastructure.village_id = data.village_id
        infrastructure.type = data.type
        infrastructure.name = data.name
        infrastructure.latitude = data.latitude
        infrastructure.longitude = data.longitude
        infrastructure.status = data.status
        infrastructure.risk_score = data.risk_score
        infrastructure.description = data.description

        db.commit()
        db.refresh(infrastructure)

    return infrastructure


def delete_infrastructure(
    infrastructure_id: int,
    db: Session
):
    infrastructure = get_infrastructure(
        infrastructure_id,
        db
    )

    if infrastructure:
        db.delete(infrastructure)
        db.commit()

    return infrastructure