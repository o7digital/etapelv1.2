ARG OLIVIA_BASE_IMAGE=olivia-v3-olivia-v3
FROM ${OLIVIA_BASE_IMAGE}
WORKDIR /app
COPY core/requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
RUN rm -rf /app/app /app/tests
COPY core/app/ app/
COPY core/tests/ tests/
COPY core/pytest.ini pytest.ini
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1 LOCAL_LLM_ENABLED=false
USER 65534:65534
EXPOSE 8093
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8093", "--workers", "1", "--no-access-log"]
