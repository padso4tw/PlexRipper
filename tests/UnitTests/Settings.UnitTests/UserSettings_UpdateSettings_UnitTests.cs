﻿using Environment;
using FluentResults;
using Logging;
using Moq;
using PlexRipper.Application.Common;
using PlexRipper.BaseTests;
using PlexRipper.Settings;
using PlexRipper.Settings.Models;
using Settings.UnitTests.MockData;
using Shouldly;
using Xunit;
using Xunit.Abstractions;

namespace Settings.UnitTests
{
    public class UserSettings_UpdateSettings_UnitTests
    {
        #region Fields

        private readonly Mock<IFileSystem> _fileSystem;

        private readonly Mock<IPathSystem> _pathSystem;

        private readonly UserSettings _sut;

        #endregion

        #region Constructor

        public UserSettings_UpdateSettings_UnitTests(ITestOutputHelper output)
        {
            Log.SetupTestLogging(output);
            _pathSystem = new Mock<IPathSystem>();
            _fileSystem = new Mock<IFileSystem>();
            _sut = new Mock<UserSettings>(_pathSystem.Object, _fileSystem.Object).Object;

            _pathSystem.Setup(x => x.ConfigFileName).Returns("Test_PlexRipperSettings.json");
            _pathSystem.Setup(x => x.ConfigDirectory).Returns("/config");
        }

        #endregion

        #region Public Methods

        [Fact]
        public void UserSettings_UpdateSettings_ShouldUpdateSettings_WhenGivenValidSettingsModel()
        {
            // Arrange
            _fileSystem.Setup(x => x.FileWriteAllText(It.IsAny<string>(), It.IsAny<string>())).Returns(Result.Ok());

            // Act
            var settingsModel = UserSettingsFakeData.GetSettingsModel().Generate();
            var resetResult = _sut.UpdateSettings(settingsModel);

            // Assert
            resetResult.IsSuccess.ShouldBeTrue();

            _sut.FirstTimeSetup.ShouldBe(settingsModel.FirstTimeSetup);
            _sut.ActiveAccountId.ShouldBe(settingsModel.ActiveAccountId);
            _sut.DownloadSegments.ShouldBe(settingsModel.DownloadSegments);

            _sut.AskDownloadMovieConfirmation.ShouldBe(settingsModel.AskDownloadMovieConfirmation);
            _sut.AskDownloadTvShowConfirmation.ShouldBe(settingsModel.AskDownloadTvShowConfirmation);
            _sut.AskDownloadSeasonConfirmation.ShouldBe(settingsModel.AskDownloadSeasonConfirmation);
            _sut.AskDownloadEpisodeConfirmation.ShouldBe(settingsModel.AskDownloadEpisodeConfirmation);

            _sut.TvShowViewMode.ShouldBe(settingsModel.TvShowViewMode);
            _sut.MovieViewMode.ShouldBe(settingsModel.MovieViewMode);

            _sut.ShortDateFormat.ShouldBe(settingsModel.ShortDateFormat);
            _sut.LongDateFormat.ShouldBe(settingsModel.LongDateFormat);
            _sut.TimeFormat.ShouldBe(settingsModel.TimeFormat);
            _sut.TimeZone.ShouldBe(settingsModel.TimeZone);
            _sut.ShowRelativeDates.ShouldBe(settingsModel.ShowRelativeDates);
        }

        #endregion
    }
}