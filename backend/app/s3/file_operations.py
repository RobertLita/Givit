import boto3
from app.core.config import settings

ses = boto3.Session(aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                    region_name=settings.AWS_REGION)
client = ses.client('s3')


async def s3_upload(contents: bytes, key: str, bucket_name: str):
    try:
        client.put_object(Body=contents, Bucket=bucket_name, Key=key)
    except Exception as err:
        print(err)


async def s3_download(key: str, bucket_name: str):
    try:
        return client.generate_presigned_url(
            ClientMethod="get_object",
            Params={
                "Bucket": bucket_name,
                "Key": key,
            },
            ExpiresIn=600,
        )
    except Exception as err:
        print(err)
