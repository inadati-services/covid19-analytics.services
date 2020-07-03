import psycopg2
import settings as env
from servant import (
    patient_infos_inserter as pii
)


def db_connect():
    return psycopg2.connect(env.DB_CONNECT)


def main():

    with db_connect() as conn:
        with conn.cursor() as db:

            pii.serve(db)


if __name__ == '__main__':
    main()
