using Microsoft.Extensions.Configuration;
using MonumentsMap.Data.Repositories;
using MonumentsMap.Domain.Repository;
using MonumentsMap.Infrastructure.Persistence;
using MonumentsMap.Infrastructure.Repositories;
using System;
using System.Threading.Tasks;

namespace MonumentsMap.Infrastructure.UnitOfWork
{
    public class UnitOfWork : IDisposable
    {
        private ApplicationContext _context;

        private ICityRepository _cityRepository;
        private IConditionRepository _conditionRepository;
        private IInvitationRepository _invitationRepository;
        private IMonumentPhotoRepository _monumentPhotoRepository;
        private IMonumentRepository _monumentRepository;
        private IParticipantMonumentRepository _participantMonumentRepository;
        private IParticipantRepository _participantRepository;
        private IPhotoRepository _photoRepository;
        private IStatusRepository _statusRepository;
        private ITokenRepository _tokenRepository;

        public UnitOfWork(ApplicationContext context)
        {
            _context = context;
        }

        public ICityRepository CityRepository
        {
            get
            {

                if (_cityRepository == null)
                {
                    _cityRepository = new CityRepository(_context);
                }
                return _cityRepository;
            }
        }

        public IConditionRepository ConditionRepository
        {
            get
            {

                if (_conditionRepository == null)
                {
                    _conditionRepository = new ConditionRepository(_context);
                }
                return _conditionRepository;
            }
        }

        public IInvitationRepository InvitationRepository
        {
            get
            {

                if (_invitationRepository == null)
                {
                    _invitationRepository = new InvitationRepository(_context);
                }
                return _invitationRepository;
            }
        }

        public IMonumentPhotoRepository MonumentPhotoRepository
        {
            get
            {

                if (_monumentPhotoRepository == null)
                {
                    _monumentPhotoRepository = new MonumentPhotoRepository(_context);
                }
                return _monumentPhotoRepository;
            }
        }

        public IMonumentRepository MonumentRepository
        {
            get
            {

                if (_monumentRepository == null)
                {
                    _monumentRepository = new MonumentRepository(_context);
                }
                return _monumentRepository;
            }
        }

        public IParticipantMonumentRepository ParticipantMonumentRepository
        {
            get
            {
                if (_participantMonumentRepository == null)
                {
                    _participantMonumentRepository = new ParticipantMonumentRepository(_context);
                }
                return _participantMonumentRepository;
            }
        }

        public IParticipantRepository ParticipantRepository
        {
            get
            {
                if (_participantRepository == null)
                {
                    _participantRepository = new ParticipantRepository(_context);
                }
                return _participantRepository;
            }
        }

        public IPhotoRepository PhotoRepository
        {
            get
            {
                if (_photoRepository == null)
                {
                    _photoRepository = new PhotoRepository(_context);
                }
                return _photoRepository;
            }
        }

        public IStatusRepository StatusRepository
        {
            get
            {
                if (_statusRepository == null)
                {
                    _statusRepository = new StatusRepository(_context);
                }
                return _statusRepository;
            }
        }

        public ITokenRepository TokenRepository
        {
            get
            {
                if (_tokenRepository == null)
                {
                    _tokenRepository = new TokenRepository(_context);
                }
                return _tokenRepository;
            }
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
