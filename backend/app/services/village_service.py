
from sqlalchemy.orm import Session

from app.models.village import Village


def create_village(data, db: Session):

    village = Village(**data.dict())

    db.add(village)

    db.commit()

    db.refresh(village)

    return village


def get_villages(db: Session):

    return db.query(Village).all()


def get_village(village_id: int, db: Session):

    return db.query(Village).filter(Village.id == village_id).first()


def update_village(village_id: int, data, db: Session):

    village = get_village(village_id, db)

    if village:

        village.name = data.name
        village.district = data.district
        village.state = data.state
        village.latitude = data.latitude
        village.longitude = data.longitude
        village.population = data.population
        village.area = data.area

        db.commit()
        db.refresh(village)

    return village


def delete_village(village_id: int, db: Session):

    village = get_village(village_id, db)

    if village:

        db.delete(village)

        db.commit()

    return village
