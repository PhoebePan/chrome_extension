chrome.tabs.query({}, function(tabs)
{
    const URL_PATTERN = "/suspended.html#url=";

    for (var i = 0; i < tabs.length; i++)
    {
        var nTabID  = tabs[i].id;
        var sTabURL = tabs[i].url;

        if (sTabURL != null)
        {
            // Check if this tab is frozen by Great Suspender
            var nPos = sTabURL.indexOf(URL_PATTERN);
            if (nPos >= 0)
            {
                // This tab is suspended by Great Suspender.
                //  Reload with original url.
                sTabURL = decodeURIComponent(sTabURL.substr(nPos+URL_PATTERN.length));
            }

            // Reload the tab
            chrome.tabs.update(nTabID, {"url": sTabURL});
        }
    }
});