from django.shortcuts import render, redirect
from .models import ShortUrl
from django.http import JsonResponse, HttpResponse
from django.middleware.csrf import get_token

def get_url(request):
    if request.method == 'POST':
        url = ShortUrl(real_url=request.POST['url'])
        url.save()
        token = get_token(request)
        return JsonResponse({'url': 'http://' + request.META['HTTP_HOST'] + '/url/' + f'{url.id}' + '/', 'token': token})

    return render(request, 'index.html')


def url(request, pk):
    try:
        url_link = ShortUrl.objects.get(pk=pk)
        return redirect(url_link.real_url)
    except:
        return HttpResponse('<p style="text-align:center; font-size:24px; margin:10% auto;"> No url found ! </p>')