import boto3
from botocore.exceptions import ClientError
from app.core.config import settings

s3 = boto3.resource('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)


async def s3_upload(contents: bytes, key: str, bucket_name: str):
    bucket = s3.Bucket(bucket_name)
    print(f'Uploading {key} to s3')
    bucket.put_object(Key=key, Body=contents)


async def s3_download(key: str, bucket_name: str):
    try:
        return s3.Object(bucket_name=bucket_name, key=key).get()['Body'].read()
    except ClientError as err:
        print(err)
