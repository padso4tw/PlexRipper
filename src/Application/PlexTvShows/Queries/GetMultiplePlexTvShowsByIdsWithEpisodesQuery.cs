﻿using System.Collections.Generic;
using FluentResults;
using MediatR;
using PlexRipper.Domain;

namespace PlexRipper.Application.PlexTvShows
{
    public class GetMultiplePlexTvShowsByIdsWithEpisodesQuery : IRequest<Result<List<PlexTvShow>>>
    {
        public GetMultiplePlexTvShowsByIdsWithEpisodesQuery(List<int> ids, bool includeData = false, bool includeLibrary = false, bool includeServer = false)
        {
            Ids = ids;
            IncludeLibrary = includeLibrary;
            IncludeServer = includeServer;
            IncludeData = includeData;
        }

        public List<int> Ids { get; }

        public bool IncludeLibrary { get; }

        public bool IncludeServer { get; }

        public bool IncludeData { get; }
    }
}