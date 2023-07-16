from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
# Create your models here.


# for handeling super user and all
class CustomerManager(BaseUserManager):
    def create_user(self, email, name, mobile_number, password=None, password2 = None):
        
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            name=name,
            mobile_number = mobile_number,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self,email, name, mobile_number, password=None):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email,
            password=password,
            name = name,
            mobile_number= mobile_number
        )
        user.is_admin = True
        user.is_staff = True

        user.save(using=self._db)
        return user

#customers model
class Customer(AbstractBaseUser):
    email = models.EmailField(
        verbose_name="email address",
        max_length=255,
        unique=True,
    )
    name = models.CharField(max_length=255)
    mobile_number = models.IntegerField()
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = CustomerManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name","mobile_number"]

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin

        
class CustomerToken(models.Model):
    token = models.CharField(max_length=100, unique=True)
    customer = models.OneToOneField(Customer, on_delete=models.CASCADE)