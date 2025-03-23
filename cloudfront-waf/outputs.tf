output "lambda_function_name" {
  value = aws_lambda_function.uuid_writer.function_name
}

output "s3_bucket_name" {
  value = aws_s3_bucket.uuid_bucket.bucket
}
